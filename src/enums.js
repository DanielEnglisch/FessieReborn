/**
 * Enums: Provides enums of this game.
 */

 /* Type of blocks in the game */
const Block = {
    AIR: 0,
    WALL: 1,
    PLAYER: 2,
    DUMPSTER: 3,
    TRASH: 4,
    DIRT: 5,
    EXIT: 6,
    STEEL_WALL: 7,
    SILVER_MONSTER: 8,
    BOMB: 9,
    SEWER: 'A',
    BLUE_WALL: 'B',
    WALL_ORGANIC: 'C',
    TRASH_MONSTER: 'D',
    SLIME_MONSTER: 'E',
    FORCE_FIELD: 'F',
    FIRE_ORB: 'G',
    TOXIC_TRASH: 'H'
};

/* Types of explosions + fire breath */
const Explosion = {
    FIRE: 0,
    SLIME: 1,
    TRASH: 2,
    BREATH: 3
};

/* Type of directions entities can look/move */
const Direc = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
    NONE: 4
};