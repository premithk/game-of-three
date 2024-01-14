#Documentation

## Requirements to Run

### Backend (NestJS)
- Node.js: Ensure that you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/). Latest LTS version should be fine.
- Docker: You can download it from [docker.com](https://www.docker.com/).

## Architecture

#### Components
1. **GameService**: Manages the game logic, including starting the game, playing turns, and checking for game over.
2. **GameController**: Exposes RESTful APIs for starting the game, playing turns, and checking if the game is over.

#### Tests
1. Unit tests are found along with the controller and the service files. `./src/game/game.controller.spec.ts` and `./src/game/game.controller.spec.ts`
2. E2E tests are found in `./test/app.e2e-spec.ts`. The E2E test also contains a test for the full gameplay.
3. You can run the unit tests using `npm run test` and `npm run test:e2e`

#### Game Flow
1. A random number is generated when a player starts, and the game begins.
2. Players take turns to adjust the number to be divisible by 3, and the game continues until one player reaches 1.

#### Docker Compose
- Two independent instances of the same NestJS application are deployed using Docker Compose to simulate two players.
![game_of_three](https://github.com/premithk/game-of-three/assets/7926867/4f3ed7fe-b3c7-4ac6-9a09-3dcbaea0ba48)

## Getting Started

1. **Clone the Repository**: `git clone https://github.com/premithk/game-of-three.git`
2. **Backend Setup**:
    - Navigate to the `game-of-three` folder.
    - Run `npm install` to install dependencies. You can also use `yarn`
    - Run `docker-compose up` to start the NestJS instances in Docker containers.
3. **Tests**:
    - There is a runner called `play.js` in the `script` folder.
    - Run it using node to see the game in action. `node script/play.js`
    - Attach screenshot

## Limitations

1. **Simplified Logic**: The game logic is kept simple for demonstration purposes. You may enhance it for a more complex and engaging gaming experience.
2. **Single Instance Interaction**: The game assumes interaction between two players within the same instance. For a real-world scenario, consider integrating WebSocket or other communication methods for cross-instance communication.
4. **Error Handling**: Basic error handling is implemented. Further enhancements can be made to handle edge cases and improve error messages.
5. **Security**: The application does not implement advanced security measures. Ensure proper security practices for production deployment.

## Screenshot
<img width="982" alt="game_of_3" src="https://github.com/premithk/game-of-three/assets/7926867/f53e1f66-3918-48d8-b1f6-7e69a4a106e6">


