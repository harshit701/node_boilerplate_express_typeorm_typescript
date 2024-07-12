import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Todo } from "../entity/Todo";


@Resolver()
export class TodoResolver {
    private todoRepository = AppDataSource.getRepository(Todo);

    @Query(() => [Todo])
    async todos() {
        return this.todoRepository.find();
    }

    @Query(() => Todo, { nullable: true })
    async todo(
        @Arg("id") id: string
    ): Promise<Todo | undefined> {
        return this.todoRepository.findOneBy({ id });
    }

    @Mutation(() => Todo)
    async createTodo(
        @Arg("title") title: string,
        @Arg("description") description: string
    ): Promise<Todo> {
        if (title) {
            throw Error('Title is required!');
        }
        const todo = this.todoRepository.create({ title, description });
        return this.todoRepository.save(todo);
    }

    @Mutation(() => Todo)
    async updateTodo(
        @Arg("id") id: string,
        @Arg("title", { nullable: true }) title?: string,
        @Arg("description", { nullable: true }) description?: string,
        @Arg("completed", { nullable: true }) completed?: boolean
    ): Promise<Todo | undefined> {
        const todo = await this.todoRepository.findOneBy({ id });
        if (!todo) return undefined;
        if (title !== undefined) todo.title = title;
        if (description !== undefined) todo.description = description;
        if (completed !== undefined) todo.completed = completed;
        return this.todoRepository.save(todo);
    }

    @Mutation(() => Boolean)
    async deleteTodo(
        @Arg("id") id: string
    ): Promise<boolean> {
        const result = await this.todoRepository.delete(id);
        return result.affected !== 0;
    }
}