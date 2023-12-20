import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CaslAbilityFactory } from './casl-ability.factory'
import { Author } from './entities/author.entity'
import { Article } from './entities/article.entity'
import { AuthorActions } from 'src/auth/enums/author-actions.enum'

@Injectable()
export class CaslService {
    private authors: Author[] = [
        {
            id: 1,
            isAdmin: true,
        },
        {
            id: 2,
            isAdmin: false,
        },
        {
            id: 3,
            isAdmin: false,
        },
    ]
    private articles: Article[] = [
        {
            id: 1,
            isPublished: true,
            authorId: 2,
        },
        {
            id: 2,
            isPublished: true,
            authorId: 2,
        },
        {
            id: 3,
            isPublished: true,
            authorId: 3,
        },
        {
            id: 4,
            isPublished: true,
            authorId: 3,
        },
    ]

    constructor(private caslAbilityFactory: CaslAbilityFactory) {}

    // получение всех записей (могут все авторы)
    getAllArticles(authorId: number): Article[] {
        const author: Author = this.authors.find(
            (author) => author.id === authorId,
        )
        const ability = this.caslAbilityFactory.createForAuthor(author)
        if (ability.can(AuthorActions.Read, Article)) {
            return this.articles
        }
        throw new UnauthorizedException("You can't get  all articles")
    }

    // создание записи (может только админ)
    addArticle(authorId: number, article: Article) {
        const author: Author = this.authors.find(
            (author) => author.id === authorId,
        )
        const ability = this.caslAbilityFactory.createForAuthor(author)
        if (ability.can(AuthorActions.Create, Article)) {
            this.articles.push(article)
        }
        else throw new UnauthorizedException("You can't create new articles")
    }

    // обновление записи (может только автор-хозяин или админ) - НЕ РАБОТАЕТ ПОЧЕМУ-ТО
    updateArticle(authorId: number, article: Article) {
        const articleId: number = article.id
        const author: Author = this.authors.find(
            (author) => author.id === authorId,
        )
        const index: number = this.articles.findIndex(
            (article) => article.id === articleId,
        )
        console.log('Article:') 
        console.log(this.articles[index])
        
        console.log('Author:')
        console.log(author)
        const ability = this.caslAbilityFactory.createForAuthor(author)
        if (ability.can(AuthorActions.Update, this.articles[index])) {
            this.articles[index] = article
        }
        else throw new UnauthorizedException("You can't update another articles")
    }

    // удаление записи (может только админ)
    deleteArticle(authorId: number, articleId: number) {
        const author: Author = this.authors.find(
            (author) => author.id === authorId,
        )
        const article: Article = this.articles.find(
            (article) => article.id === articleId,
        )

        console.log('Article:') 
        console.log(article)
        
        console.log('Author:')
        console.log(author)

        const ability = this.caslAbilityFactory.createForAuthor(author)
        if (ability.can(AuthorActions.Delete, article)) {
            this.articles = this.articles.filter(
                (article) => article.id !== articleId,
            )
        }
        else throw new UnauthorizedException("You can't delete articles")
    }

    
}
