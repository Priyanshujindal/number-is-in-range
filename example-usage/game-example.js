#!/usr/bin/env node

/**
 * Game Development Example - number-is-in-range
 * 
 * This example demonstrates gaming scenarios using the number-is-in-range package:
 * - Player health system
 * - Score boundaries
 * - Level progression
 * - Inventory management
 * - Game mechanics
 */

// Import the package
require('number-is-in-range');

// Import utility functions
const {
    createRangeValidator,
    isInRange,
    clampToRange,
    distanceToRange,
    rangeSize,
    rangeCenter
} = require('number-is-in-range');

console.log('🎮 Game Development Example - number-is-in-range Package\n');

// ============================================================================
// 1. Player Health System
// ============================================================================
console.log('❤️ 1. Player Health System:');
console.log('============================');

class Player {
    constructor(name, maxHealth = 100) {
        this.name = name;
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
        this.level = 1;
        this.experience = 0;
        this.inventory = [];
        this.gold = 0;
        
        // Create validators
        this.healthValidator = createRangeValidator(0, maxHealth, { exclusive: false });
        this.levelValidator = createRangeValidator(1, 100, { exclusive: false });
        this.experienceValidator = createRangeValidator(0, 999999, { exclusive: false });
        this.goldValidator = createRangeValidator(0, 999999, { exclusive: false });
    }

    takeDamage(amount) {
        const newHealth = this.currentHealth - amount;
        this.currentHealth = clampToRange(newHealth, 0, this.maxHealth);
        
        const healthPercentage = (this.currentHealth / this.maxHealth) * 100;
        const status = this.isAlive() ? 'Alive' : 'Dead';
        
        console.log(`   ${this.name} took ${amount} damage. Health: ${this.currentHealth}/${this.maxHealth} (${healthPercentage.toFixed(1)}%) - ${status}`);
        return this.isAlive();
    }

    heal(amount) {
        const newHealth = this.currentHealth + amount;
        this.currentHealth = clampToRange(newHealth, 0, this.maxHealth);
        
        const healthPercentage = (this.currentHealth / this.maxHealth) * 100;
        console.log(`   ${this.name} healed ${amount} HP. Health: ${this.currentHealth}/${this.maxHealth} (${healthPercentage.toFixed(1)}%)`);
    }

    isAlive() {
        return this.healthValidator(this.currentHealth) && this.currentHealth > 0;
    }

    getHealthStatus() {
        if (this.currentHealth <= 0) return 'Dead';
        if (this.currentHealth <= this.maxHealth * 0.25) return 'Critical';
        if (this.currentHealth <= this.maxHealth * 0.5) return 'Low';
        if (this.currentHealth <= this.maxHealth * 0.75) return 'Moderate';
        return 'Healthy';
    }

    gainExperience(amount) {
        this.experience += amount;
        this.experience = clampToRange(this.experience, 0, 999999);
        
        // Level up logic
        const experiencePerLevel = 1000;
        const newLevel = Math.floor(this.experience / experiencePerLevel) + 1;
        
        if (newLevel > this.level) {
            this.level = clampToRange(newLevel, 1, 100);
            console.log(`   🎉 ${this.name} leveled up to level ${this.level}!`);
        }
        
        console.log(`   ${this.name} gained ${amount} XP. Total: ${this.experience} (Level ${this.level})`);
    }

    addGold(amount) {
        this.gold += amount;
        this.gold = clampToRange(this.gold, 0, 999999);
        console.log(`   ${this.name} gained ${amount} gold. Total: ${this.gold}`);
    }

    spendGold(amount) {
        if (this.gold >= amount) {
            this.gold -= amount;
            console.log(`   ${this.name} spent ${amount} gold. Remaining: ${this.gold}`);
            return true;
        } else {
            console.log(`   ❌ ${this.name} doesn't have enough gold! Need: ${amount}, Have: ${this.gold}`);
            return false;
        }
    }
}

// Test the player system
const player = new Player('Hero', 100);
console.log(`   Created player: ${player.name} (Level ${player.level})`);

// Simulate combat
player.takeDamage(30);
player.heal(10);
player.takeDamage(50);
player.heal(20);
player.takeDamage(60); // Should die

console.log(`   Health status: ${player.getHealthStatus()}`);

// ============================================================================
// 2. Score and Achievement System
// ============================================================================
console.log('\n🏆 2. Score and Achievement System:');
console.log('===================================');

class ScoreSystem {
    constructor() {
        this.score = 0;
        this.highScore = 0;
        this.achievements = [];
        
        this.scoreValidator = createRangeValidator(0, 999999, { exclusive: false });
        this.achievementRanges = [
            [0, 1000, 'Beginner'],
            [1000, 5000, 'Amateur'],
            [5000, 10000, 'Professional'],
            [10000, 25000, 'Expert'],
            [25000, 50000, 'Master'],
            [50000, 999999, 'Legend']
        ];
    }

    addScore(points) {
        this.score += points;
        this.score = clampToRange(this.score, 0, 999999);
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            console.log(`   🎉 New high score: ${this.highScore}!`);
        }
        
        const rank = this.getRank();
        console.log(`   Score: ${this.score} (${rank})`);
        
        this.checkAchievements();
    }

    getRank() {
        for (const [min, max, rank] of this.achievementRanges) {
            if (this.score.isInRange(min, max)) {
                return rank;
            }
        }
        return 'Unknown';
    }

    checkAchievements() {
        const newAchievements = [];
        
        if (this.score >= 1000 && !this.achievements.includes('First Milestone')) {
            newAchievements.push('First Milestone');
        }
        if (this.score >= 5000 && !this.achievements.includes('Score Hunter')) {
            newAchievements.push('Score Hunter');
        }
        if (this.score >= 10000 && !this.achievements.includes('Point Master')) {
            newAchievements.push('Point Master');
        }
        if (this.score >= 25000 && !this.achievements.includes('High Scorer')) {
            newAchievements.push('High Scorer');
        }
        
        if (newAchievements.length > 0) {
            this.achievements.push(...newAchievements);
            console.log(`   🏆 Achievements unlocked: ${newAchievements.join(', ')}`);
        }
    }

    reset() {
        this.score = 0;
        console.log('   Score reset to 0');
    }
}

const scoreSystem = new ScoreSystem();
scoreSystem.addScore(500);
scoreSystem.addScore(1200);
scoreSystem.addScore(3000);
scoreSystem.addScore(8000);
scoreSystem.addScore(15000);

// ============================================================================
// 3. Inventory Management
// ============================================================================
console.log('\n🎒 3. Inventory Management:');
console.log('===========================');

class Inventory {
    constructor(maxSlots = 20) {
        this.maxSlots = maxSlots;
        this.items = [];
        this.maxStackSize = 99;
        
        this.slotValidator = createRangeValidator(0, maxSlots, { exclusive: false });
        this.stackValidator = createRangeValidator(0, this.maxStackSize, { exclusive: false });
    }

    addItem(itemName, quantity = 1) {
        const existingItem = this.items.find(item => item.name === itemName);
        
        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            existingItem.quantity = clampToRange(newQuantity, 0, this.maxStackSize);
            console.log(`   Added ${quantity} ${itemName}. Total: ${existingItem.quantity}`);
        } else if (this.items.length < this.maxSlots) {
            const clampedQuantity = clampToRange(quantity, 1, this.maxStackSize);
            this.items.push({ name: itemName, quantity: clampedQuantity });
            console.log(`   Added ${clampedQuantity} ${itemName} to new slot`);
        } else {
            console.log(`   ❌ Inventory full! Cannot add ${itemName}`);
        }
    }

    removeItem(itemName, quantity = 1) {
        const itemIndex = this.items.findIndex(item => item.name === itemName);
        
        if (itemIndex !== -1) {
            const item = this.items[itemIndex];
            const newQuantity = item.quantity - quantity;
            
            if (newQuantity <= 0) {
                this.items.splice(itemIndex, 1);
                console.log(`   Removed all ${itemName} from inventory`);
            } else {
                item.quantity = newQuantity;
                console.log(`   Removed ${quantity} ${itemName}. Remaining: ${item.quantity}`);
            }
        } else {
            console.log(`   ❌ Item ${itemName} not found in inventory`);
        }
    }

    getItemCount(itemName) {
        const item = this.items.find(item => item.name === itemName);
        return item ? item.quantity : 0;
    }

    getInventoryStatus() {
        const usedSlots = this.items.length;
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const capacity = (usedSlots / this.maxSlots) * 100;
        
        return {
            usedSlots,
            maxSlots: this.maxSlots,
            totalItems,
            capacity: capacity.toFixed(1)
        };
    }
}

const inventory = new Inventory(10);
inventory.addItem('Health Potion', 5);
inventory.addItem('Mana Potion', 3);
inventory.addItem('Sword', 1);
inventory.addItem('Health Potion', 10);
inventory.removeItem('Health Potion', 3);

const status = inventory.getInventoryStatus();
console.log(`   Inventory: ${status.usedSlots}/${status.maxSlots} slots used (${status.capacity}% capacity)`);

// ============================================================================
// 4. Game Mechanics - Damage Calculation
// ============================================================================
console.log('\n⚔️ 4. Game Mechanics - Damage Calculation:');
console.log('==========================================');

class CombatSystem {
    constructor() {
        this.criticalHitRange = [90, 100];
        this.dodgeRange = [1, 10];
        this.blockRange = [11, 25];
    }

    calculateDamage(attacker, defender, baseDamage) {
        const accuracy = Math.random() * 100;
        const criticalRoll = Math.random() * 100;
        
        // Check for dodge
        if (accuracy.isInRange(...this.dodgeRange)) {
            console.log(`   ${defender.name} dodged the attack!`);
            return 0;
        }
        
        // Check for block
        if (accuracy.isInRange(...this.blockRange)) {
            const blockedDamage = Math.floor(baseDamage * 0.5);
            console.log(`   ${defender.name} blocked the attack! Damage reduced to ${blockedDamage}`);
            return blockedDamage;
        }
        
        // Check for critical hit
        if (criticalRoll.isInRange(...this.criticalHitRange)) {
            const criticalDamage = Math.floor(baseDamage * 1.5);
            console.log(`   💥 Critical hit! Damage: ${criticalDamage}`);
            return criticalDamage;
        }
        
        return baseDamage;
    }

    calculateExperienceReward(playerLevel, enemyLevel, baseReward = 100) {
        const levelDifference = enemyLevel - playerLevel;
        let multiplier = 1;
        
        if (levelDifference.isInRange(-5, 0)) {
            multiplier = 1.2; // Bonus for fighting higher level enemies
        } else if (levelDifference.isInRange(1, 5)) {
            multiplier = 0.8; // Penalty for fighting lower level enemies
        } else if (levelDifference < -5) {
            multiplier = 0.5; // Heavy penalty for much lower level enemies
        }
        
        return Math.floor(baseReward * multiplier);
    }
}

const combat = new CombatSystem();
const enemy = new Player('Goblin', 50);

console.log(`   Combat simulation: ${player.name} vs ${enemy.name}`);
const damage = combat.calculateDamage(player, enemy, 25);
enemy.takeDamage(damage);

const expReward = combat.calculateExperienceReward(player.level, enemy.level, 150);
console.log(`   Experience reward: ${expReward} XP`);

// ============================================================================
// 5. Level Progression System
// ============================================================================
console.log('\n📈 5. Level Progression System:');
console.log('==============================');

class ProgressionSystem {
    constructor() {
        this.levelRanges = [
            [1, 10, 'Novice'],
            [11, 25, 'Apprentice'],
            [26, 50, 'Journeyman'],
            [51, 75, 'Expert'],
            [76, 90, 'Master'],
            [91, 100, 'Grandmaster']
        ];
        
        this.experienceRequirements = this.calculateExperienceRequirements();
    }

    calculateExperienceRequirements() {
        const requirements = {};
        for (let level = 1; level <= 100; level++) {
            requirements[level] = level * 1000; // 1000 XP per level
        }
        return requirements;
    }

    getLevelInfo(level) {
        for (const [min, max, title] of this.levelRanges) {
            if (level.isInRange(min, max)) {
                return { title, tier: Math.ceil((max - min + 1) / 10) };
            }
        }
        return { title: 'Unknown', tier: 0 };
    }

    calculateProgress(currentExp, level) {
        const currentLevelExp = this.experienceRequirements[level];
        const nextLevelExp = this.experienceRequirements[level + 1] || currentLevelExp;
        const progressInLevel = currentExp - currentLevelExp;
        const expNeededForNextLevel = nextLevelExp - currentLevelExp;
        
        return {
            currentLevel: level,
            currentExp,
            expNeeded: expNeededForNextLevel,
            progress: expNeededForNextLevel > 0 ? (progressInLevel / expNeededForNextLevel) * 100 : 100
        };
    }

    getRewards(level) {
        const rewards = {
            skillPoints: Math.floor(level / 5) + 1,
            attributePoints: Math.floor(level / 10) + 1,
            goldBonus: level * 10,
            unlockables: []
        };
        
        if (level.isInRange(5, 10)) rewards.unlockables.push('Basic Skills');
        if (level.isInRange(15, 25)) rewards.unlockables.push('Advanced Skills');
        if (level.isInRange(30, 50)) rewards.unlockables.push('Special Abilities');
        if (level.isInRange(60, 100)) rewards.unlockables.push('Ultimate Powers');
        
        return rewards;
    }
}

const progression = new ProgressionSystem();

// Test progression for different levels
[1, 5, 15, 30, 60, 90].forEach(level => {
    const levelInfo = progression.getLevelInfo(level);
    const rewards = progression.getRewards(level);
    const progress = progression.calculateProgress(level * 500, level);
    
    console.log(`   Level ${level} (${levelInfo.title}):`);
    console.log(`     Progress: ${progress.progress.toFixed(1)}% to next level`);
    console.log(`     Rewards: ${rewards.skillPoints} skill points, ${rewards.attributePoints} attribute points`);
    if (rewards.unlockables.length > 0) {
        console.log(`     Unlockables: ${rewards.unlockables.join(', ')}`);
    }
});

// ============================================================================
// 6. Game Balance and Scaling
// ============================================================================
console.log('\n⚖️ 6. Game Balance and Scaling:');
console.log('==============================');

class GameBalance {
    constructor() {
        this.difficultyRanges = [
            [1, 10, 'Easy'],
            [11, 25, 'Normal'],
            [26, 50, 'Hard'],
            [51, 75, 'Expert'],
            [76, 100, 'Nightmare']
        ];
    }

    calculateEnemyStats(level, difficulty = 'Normal') {
        const baseStats = {
            health: 50,
            attack: 10,
            defense: 5,
            experience: 100
        };
        
        const difficultyMultiplier = this.getDifficultyMultiplier(difficulty);
        const levelScaling = Math.pow(1.1, level - 1);
        
        return {
            health: Math.floor(baseStats.health * difficultyMultiplier * levelScaling),
            attack: Math.floor(baseStats.attack * difficultyMultiplier * levelScaling),
            defense: Math.floor(baseStats.defense * difficultyMultiplier * levelScaling),
            experience: Math.floor(baseStats.experience * difficultyMultiplier * levelScaling)
        };
    }

    getDifficultyMultiplier(difficulty) {
        const multipliers = {
            'Easy': 0.8,
            'Normal': 1.0,
            'Hard': 1.3,
            'Expert': 1.6,
            'Nightmare': 2.0
        };
        return multipliers[difficulty] || 1.0;
    }

    calculateRewardScaling(playerLevel, enemyLevel, baseReward) {
        const levelDifference = enemyLevel - playerLevel;
        let multiplier = 1;
        
        if (levelDifference.isInRange(-3, 3)) {
            multiplier = 1.0; // Normal reward
        } else if (levelDifference.isInRange(-10, -4)) {
            multiplier = 0.5; // Reduced reward for much lower level
        } else if (levelDifference.isInRange(4, 10)) {
            multiplier = 2.0; // Bonus reward for higher level
        } else if (levelDifference > 10) {
            multiplier = 3.0; // Massive bonus for much higher level
        }
        
        return Math.floor(baseReward * multiplier);
    }
}

const balance = new GameBalance();

// Test enemy scaling
[1, 10, 25, 50, 75].forEach(level => {
    const stats = balance.calculateEnemyStats(level, 'Normal');
    console.log(`   Level ${level} Enemy: HP: ${stats.health}, ATK: ${stats.attack}, DEF: ${stats.defense}, EXP: ${stats.experience}`);
});

// Test reward scaling
const playerLevel = 20;
[10, 15, 20, 25, 30].forEach(enemyLevel => {
    const reward = balance.calculateRewardScaling(playerLevel, enemyLevel, 100);
    console.log(`   Enemy level ${enemyLevel} reward: ${reward} XP`);
});

console.log('\n🎉 Game development example completed successfully!');
console.log('📚 Check out the other examples for more use cases:');
console.log('   - form-validation-example.js: Real-world form validation'); 