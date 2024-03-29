<script lang="ts">
  import ConnectionDetails from "./ConnectionDetails.svelte";
  import Toggle from "../ui/Toggle.svelte";

  import { Color } from "../game/GameData";
  import { Connection } from "../connection/Connection";
  import { Client, Multiplayer, Game } from "../stores";

  let createdPeer = false;
  let open: Promise<string>;

  const handleCreatePeer = async () => {
    createdPeer = true;
    open = $Client.open();
  };

  let connectionId = "";
  let connection: Connection;

  let isBlack = false;

  $Client.openTriggers.push(() => {
    $Client.remoteConnection = (remoteConnection) => {};

    $Client.connectionClient.closeConnection = (connectionId) => {
      if (connectionId === $Multiplayer.connectionId) {
        Multiplayer.update((currentMultiplayer) => {
          currentMultiplayer.closeConnection();

          return currentMultiplayer;
        });
      }
    };

    $Client.connectionClient.recievers.push((payload, id) => {
      if ($Multiplayer.connected && $Multiplayer.connectionId !== id) {
        $Client.connectionClient.send(
          {
            type: "textInfo",
            data: "This peer is already connected to somebody else!",
          },
          id
        );

        $Client.connectionClient.list.get(id).close();
        return;
      }

      if (payload?.type === "setup") {
        const connection = $Client.connectionClient.list.get(id);

        const color =
          payload.data.color === Color.White ? Color.Black : Color.White;

        Multiplayer.update((currentHandler) => {
          currentHandler.setupConnection(connection, color);

          return currentHandler;
        });

        Game.update((currentGame) => {
          currentGame.set(payload.data.gameData);

          return currentGame;
        });
      }
    });
  });

  const handleConnect = async () => {
    try {
      connection = await $Client.connectionClient.connect(connectionId, {
        reliable: true,
      });
    } catch {
      console.log("failed to connect!");
      return;
    }

    const color = isBlack ? Color.Black : Color.White;

    Multiplayer.update((currentHandler) => {
      currentHandler.setupConnection(connection, color);

      return currentHandler;
    });

    Game.update((currentGame) => {
      currentGame.reset();
      return currentGame;
    });

    $Client.connectionClient.send(
      {
        type: "setup",
        data: { gameData: $Game.get(), color },
      },
      $Multiplayer.connectionId
    );
  };

  const handleDisconnect = () => {
    $Client.connectionClient.disconnect($Multiplayer.connectionId);

    Multiplayer.update((currentMultiplayer) => {
      currentMultiplayer.closeConnection();

      return currentMultiplayer;
    });
  };
</script>

<div class="panelContainer">
  {#if createdPeer}
    {#await open}
      <p>Creating peer...</p>
    {:then id}
      {#if $Multiplayer.connected}
        <ConnectionDetails />

        <button type="button" on:click={handleDisconnect}>Disconnect</button>
      {:else}
        <p>Created peer with id:</p>
        <pre>{id}</pre>

        <label for="connectionId">Connection ID</label>
        <input type="text" id="connectionId" bind:value={connectionId} />

        <div>
          Choose a color

          <Toggle text={["White", "Black"]} bind:isOn={isBlack} />
        </div>

        <button type="button" on:click={handleConnect}>Connect</button>
      {/if}
    {/await}
  {:else}
    Want to play with somebody?
    <button type="button" on:click={handleCreatePeer}>Create a peer</button>
  {/if}
</div>

<style>
  .panelContainer {
    margin: 1em;
  }
</style>
