import { GameRoomUser } from "../pages/GameRoom/GameRoom";

export const getPlayersRank = ( players : GameRoomUser[]) => {
    const surrenders = players.filter((player) => player.isGameQuit === true); 
    // players
    const ranksWithoutSurrenders = players.filter((player) => player.isGameQuit === false).sort(
        (playerA, playerB) => {
            if(playerA.currentScore === playerB.currentScore)
                return  playerB.currentMoney - playerA.currentMoney;
            return playerA.currentScore - playerB.currentScore
        }
    );
    return [...ranksWithoutSurrenders, ...surrenders];
}