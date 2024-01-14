const axios = require('axios');

const playGame = async (playerNumber) => {
  try {
    const startResponse = await axios.get(
      `http://localhost:300${playerNumber}/game/start`,
      { timeout: 5000 }, // Set a timeout of 5 seconds in case the server is unavailable
    );

    let currentNumber = startResponse.data;
    const outPutArray = [];

    outPutArray.push({
      player: playerNumber,
      number: currentNumber,
      message: `Player ${playerNumber} provided ${currentNumber} to start the game`,
      operation: '',
    });

    console.log(
      `Player ${playerNumber} provided ${currentNumber} to start the game`,
    );

    while (true) {
      playerNumber = playerNumber === 1 ? 2 : 1;

      const playResponse = await axios.get(
        `http://localhost:300${playerNumber}/game/play/${currentNumber}`,
        { timeout: 5000 }, // Set a timeout of 5 seconds in case the server is unavailable
      );

      const prevNumber = currentNumber;

      currentNumber = playResponse.data.result;
      console.log(
        `Player ${playerNumber} provided ${currentNumber} ( = (${prevNumber} + ${playResponse.data.added}) / 3)`,
      );

      outPutArray.push({
        player: playerNumber,
        number: currentNumber,
        message: `Player ${playerNumber} provided ${currentNumber} `,
        operation: `= (${prevNumber} + ${playResponse.data.added}) / 3)`,
      });

      const gameOverResponse = await axios.get(
        `http://localhost:300${playerNumber}/game/gameover`,
      );

      if (gameOverResponse.data) {
        outPutArray.push({
          player: playerNumber,
          number: currentNumber,
          message: `Player ${playerNumber} won! Game Over.`,
          operation: '',
        });

        console.log(`Player ${playerNumber} won! Game Over.`);

        console.table(outPutArray);
        break;
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED' || error.code === 'ECONNREFUSED') {
        console.log(`Player ${playerNumber} is not available. Game Over.`);
      } else {
        console.error(`Error while playing: ${error.message}`);
      }
    } else {
      console.error(
        `Error starting or getting initial game state: ${error.message}`,
      );
    }
  }
};

// Start playing with Player 1
playGame(1);
