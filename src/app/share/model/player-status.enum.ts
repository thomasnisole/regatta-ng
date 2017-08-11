export enum PlayerStatus {
  WAITING_TO_START = 0,
  WAITING_TO_PLAY = 1,
  MOVE_PLAYED = 2,
  MOVE_SW_PLAYED = 3, // Steering Wheel
  MOVE_CLOUD_PLAYED = 4,
  TACKED = 5,
  CARD_DROPPED = 6,
  TRAP_PLAYED = 7,
  CARD_TAKEN = 8,
  TERMINATED = 9
}
