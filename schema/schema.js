const graphql = require("graphql");
const Agent = require("../models").Agent;
const {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList} = graphql;

const agentFields = {
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString},
    email: {type: GraphQLString},
    zipCode: {type: GraphQLString},
    suite: {type: GraphQLString},
    streetAddress: {type: GraphQLString},
    city: {type: GraphQLString},
    state: {type: GraphQLString},
    phoneNumber: {type: GraphQLString},
};

const AgentType = new GraphQLObjectType({
    name: "Agent",
    fields: () => (agentFields)
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        agent: {
            type: AgentType,
            args: agentFields,
            resolve: async (parent, args) => {
                return await Agent.findOne({where: {...args}});
            }
        },
        agents: {
            type: GraphQLList(AgentType),
            args: agentFields,
            resolve: async (parent, args) => {
                return await Agent.findAll({where: {...args}});
            }
        }
    }
});

const Mutations = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createAgent: {
            type: AgentType,
            args: agentFields,
            resolve: async (parent, args) => {


                const agent = await Agent.findOne({where: {email: args.email}});
                if (agent) {
                    return agent
                }

                const newAgent = await Agent.build({...args}).save();
                return newAgent

            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});