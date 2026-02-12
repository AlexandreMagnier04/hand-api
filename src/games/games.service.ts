import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(Game)
        private gamesRepository: Repository<Game>,

        @InjectRepository(User) private usersRepository: Repository<User>,
    ) { }

    // 1. CRÉATION AVEC VÉRIFICATION DE DATE
    async create(createGameDto: CreateGameDto) {
        // A. On vérifie si un match existe déjà à cette date précise
        const existingGame = await this.gamesRepository.findOne({
            where: { date: createGameDto.date },
        });

        if (existingGame) {
            // Si oui, on lance une erreur 409 Conflict
            throw new ConflictException('Un match est déjà prévu à cette date !');
        }

        // B. Si c'est libre, on crée
        const game = this.gamesRepository.create(createGameDto);
        return this.gamesRepository.save(game);
    }

    // 2. RÉCUPÉRER TOUS LES MATCHS + JOUEURS
    findAll() {
        return this.gamesRepository.find({
            relations: ['players'], // Affiche la liste des joueurs pour chaque match
            order: { date: 'ASC' } // Tri par date d'ajout
        });
    }

    // 3. RÉCUPÉRER UN MATCH + JOUEURS
    async findOne(id: number) {
        const game = await this.gamesRepository.findOne({
            where: { id },
            relations: ['players'], // Affiche la liste des joueurs pour chaque match
        });

        if (!game) {
            throw new NotFoundException(`Match #${id} introuvable`);
        }
        return game;
    }

    // 4. MISE À JOUR D'UN MATCH
    async update(id: number, updateGameDto: UpdateGameDto) {
        const game = await this.gamesRepository.preload({
            id: +id,
            ...updateGameDto,
        });

        if (!game) {
            throw new NotFoundException(`Match #${id} introuvable`);
        }

        return this.gamesRepository.save(game);
    }

    // 5. INSCRIPTION D'UN JOUEUR À UN MATCH
    async addPlayer(gameId: number, player: User) {
        const game = await this.gamesRepository.findOne({
            where: { id: gameId },
            relations: ['players'],
        });

        if (!game) {
            throw new NotFoundException(`Le match #${gameId} n'existe pas`);
        }

        const isAlreadyRegistered = game.players.some((p) => p.id === player.id);

        if (!isAlreadyRegistered) {
            game.players.push(player);
            return this.gamesRepository.save(game);
        }

        return game;
    }

    // 5. INSCRIPTION D'UN JOUEUR À UN MATCH PAR QUELQU'UN
    async addPlayerById(gameId: number, playerId: number) {
        // 1. On cherche le match
        const game = await this.gamesRepository.findOne({
            where: { id: gameId },
            relations: ['players'],
        });
        if (!game) throw new NotFoundException(`Match #${gameId} introuvable`);

        // 2. On cherche le joueur cible
        const player = await this.usersRepository.findOne({ where: { id: playerId } });
        if (!player) throw new NotFoundException(`Joueur #${playerId} introuvable`);

        // 3. On vérifie s'il est déjà inscrit
        const isAlreadyRegistered = game.players.some((p) => p.id === player.id);

        if (!isAlreadyRegistered) {
            game.players.push(player);
            return this.gamesRepository.save(game);
        }

        return game; // Déjà inscrit, on renvoie le match tel quel
    }

    // 6. SUPPRESSION D'UN MATCH (optionnel)
    async removePlayer(gameId: number, player: User) {
        const game = await this.gamesRepository.findOne({
            where: { id: gameId },
            relations: ['players'],
        });

        if (!game) {
            throw new NotFoundException(`Match #${gameId} introuvable`);
        }

        // On filtre le tableau pour garder tout le monde SAUF le joueur concerné
        game.players = game.players.filter((p) => p.id !== player.id);

        return this.gamesRepository.save(game);
    }
}