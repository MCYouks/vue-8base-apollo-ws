import fruitSubscription from "@/graphql/subscriptions/fruit.gql";
import fruitsListQuery from "@/graphql/queries/fruitsList.gql";
import { useQuery, useResult, useSubscription } from "@vue/apollo-composable";

export const useFruitsQuery = function(variables = () => {}) {
  // Apollo Query API
  const { result, loading, error, onResult, onError } = useQuery(
    fruitsListQuery,
    variables
  );

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
