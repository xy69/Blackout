import { GameComponent } from "../components/GameComponent";
import { getValidQueenMoves, isMoveValid } from "../game/Chess";
import { Game } from "../game/Game";
import { Color, GameElement, SquareTypes } from "../types";

export class Player {
  gameComponent: GameComponent;
  game: Game;

  color: Color | "nocolor";

  constructor(gameElement: GameElement, game: Game) {
    this.gameComponent = new GameComponent(gameElement, game);
    this.game = game;

    this.color = "nocolor";

    this.gameComponent.boardComponent.forEachSquare(
      (squareComponent, position) => {
        squareComponent.element.onclick = () => {
          console.log(this.game.board.getSquareType(position), position);

          if (this.color !== "nocolor") {
            if (
              (this.color === "white" && this.game.turnColor !== "white") ||
              (this.color === "black" && this.game.turnColor !== "black")
            ) {
              return;
            }
          }

          switch (this.game.board.getSquareType(position)) {
            case SquareTypes.Empty:
              if (this.game.turnAction === "card") {
                this.game.board.setSquareType(position, SquareTypes.Card);

                this.game.nextTurn();
              }

              if (
                this.game.turnAction === "piece" &&
                this.gameComponent.activePiece.wasClicked
              ) {
                if (
                  isMoveValid(
                    position,
                    this.gameComponent.activePiece.validMoves
                  )
                ) {
                  this.game.board.movePiece(
                    this.gameComponent.activePiece.position,
                    position
                  );

                  this.gameComponent.resetPiece();

                  this.game.nextTurn();
                } else {
                  this.gameComponent.resetPiece();
                }
              }
              break;

            case SquareTypes.Card:
              this.gameComponent.resetPiece();
              break;

            case SquareTypes.WhitePiece:
              if (this.gameComponent.activePiece.wasClicked) {
                if (this.gameComponent.activePiece.position === position) {
                  this.gameComponent.resetPiece();
                  break;
                }
              }

              this.gameComponent.resetPiece();

              if (
                this.game.turnAction === "piece" &&
                this.game.turnColor === "white"
              ) {
                const validMoves = getValidQueenMoves(
                  this.game.board,
                  position
                );

                this.gameComponent.setActivePiece(position, validMoves);
              }
              break;

            case SquareTypes.BlackPiece:
              if (this.gameComponent.activePiece.wasClicked) {
                if (this.gameComponent.activePiece.position === position) {
                  this.gameComponent.resetPiece();
                  break;
                }
              }

              this.gameComponent.resetPiece();

              if (
                this.game.turnAction === "piece" &&
                this.game.turnColor === "black"
              ) {
                const validMoves = getValidQueenMoves(
                  this.game.board,
                  position
                );

                this.gameComponent.setActivePiece(position, validMoves);
              }
              break;
          }
        };
      }
    );
  }

  setGame(game: Game) {
    this.game = game;

    this.gameComponent.setGame(game);
  }
}
