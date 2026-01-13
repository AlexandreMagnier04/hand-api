import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private newsRepository: Repository<News>,
    ) { }

    // On passe l'utilisateur complet (récupéré via le token) pour l'assigner comme auteur
    async create(createNewsDto: CreateNewsDto, author: User) {
        const news = this.newsRepository.create({
            ...createNewsDto,
            author: author, // Liaison automatique avec l'entité User
        });
        return this.newsRepository.save(news);
    }

    async findAll() {
        // On utilise 'relations' pour récupérer les infos de l'auteur avec la news
        return this.newsRepository.find({ relations: ['author'] });
    }

    async findOne(id: number) {
        const news = await this.newsRepository.findOne({
            where: { id },
            relations: ['author']
        });
        if (!news) throw new NotFoundException(`News avec l'id ${id} non trouvée`);
        return news;
    }
}