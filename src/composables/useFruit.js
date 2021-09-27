import fruitSubscription from "@/graphql/subscriptions/fruit.gql";
import fruitsListQuery from "@/graphql/queries/fruitsList.gql";
import { useQuery, useResult, useSubscription } from "@vue/apollo-composable";

export const useFruitsQuery = function(variables = () => {}) {
  // Apollo Query API
  const {
    result,
    loading,
    error,
    subscribeToMore,
    onResult,
    onError
  } = useQuery(fruitsListQuery, variables);

  subscribeToMore(() => ({
    document: fruitSubscription,
    filter: {
      mutation_in: ["create", "update"]
    },
    updateQuery: (previousResult, { subscriptionData }) => {
      console.log({ previousResult, subscriptionData });
      // Extract new fruit
      const newFruit = subscriptionData.data.Fruit.node;

      // Setup previous fruits
      const previousFruits = previousResult.fruitsList.items.filter(
        fruit => fruit.id !== newFruit.id
      );

      // Setup new fruits
      const newFruits = [...previousFruits, newFruit];

      // Setup new result
      const newResult = {
        fruitsList: {
          items: newFruits,
          __typename: "FruitListResponse"
        }
      };

      return newResult;
    }
  }));

  const fruits = useResult(result, [], data => data.fruitsList.items);

  return {
    // States
    fruits,
    loading,
    error,

    // Event Hooks
    onResult,
    onError
  };
};

export const useFruitSubscription = function(
  variables = () => ({}),
  options = () => ({})
) {
  // Apollo Subscription API
  const { result } = useSubscription(fruitSubscription, variables, options);

  console.log({ result: result.value });

  return {
    result
  };
};
