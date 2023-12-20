import { Injectable } from '@nestjs/common'
import { Author } from './entities/author.entity'
import {
    Ability,
    AbilityBuilder,
    AbilityClass,
    ExtractSubjectType,
    InferSubjects,
} from '@casl/ability'
import { AuthorActions } from 'src/auth/enums/author-actions.enum'
import { Article } from './entities/article.entity'

type Subjects = InferSubjects<typeof Article | typeof Author> | 'all'
export type AppAbility = Ability<[AuthorActions, Subjects]>

@Injectable()
export class CaslAbilityFactory {
    createForAuthor(author: Author) {
        const { can, cannot, build } = new AbilityBuilder<
            Ability<[AuthorActions, Subjects]>
        >(Ability as AbilityClass<AppAbility>)
        if (author.isAdmin) {
            // админ может делать что угодно с любыми постами
            can(AuthorActions.Manage, 'all')
        } else {
            // обычный автор может читать любые посты
            can(AuthorActions.Read, 'all')
        } 

        // НЕ РАБОТАЕТ ПОЧЕМУ-ТО
        // обычный автор может менять посты, которые ему принадлежат
        can(AuthorActions.Update, Article, { authorId: author.id })
        

        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>,
        })
    }
}
