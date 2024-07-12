import { buildSchemaSync } from "type-graphql";
import { TodoResolver } from "./todo";


export const schema = buildSchemaSync({
    resolvers: [TodoResolver]
})