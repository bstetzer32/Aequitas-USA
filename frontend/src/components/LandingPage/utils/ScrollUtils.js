import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
// import * as sessionActions from "../../../store/session";
import * as feedActions from "../../../store/feed";

const ARRAY_SIZE = 20;
// const RESPONSE_TIME_IN_MS = 1000;





// function loadItems(startCursor = 0) {
  
//   return (async () => {
//     let newArray = [];

//     setTimeout(() => {
//       for (let i = startCursor; i < startCursor + ARRAY_SIZE; i++) {
//         // const dbItem = items[i]
//         const newItem = {
//           key: i,
//           // value: dbItem
//         };
//         newArray = [...newArray, newItem];
//       }

//       return { hasNextPage: true, data: newArray };
//     }, RESPONSE_TIME_IN_MS);
//   });
// }

export function useLoadItems() {
  const context = {};
  const sessionSubs = useSelector(state => state.session.subs);
  context.regions = sessionSubs?.regionSubs.map(region => region.id)
  context.offices = sessionSubs?.officeSubs.map(office => office.id)
  const dispatch = useDispatch();
  const items = useSelector(state => state.feed);
  const [loading, setLoading] = React.useState(false);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [error, setError] = React.useState();
  async function loadMore() {
    setLoading(true);
    try {
      await dispatch(feedActions.getItems(context, ARRAY_SIZE))
      // const { data, hasNextPage: newHasNextPage } = await loadItems(
      //   items.length, items
      // );
      setHasNextPage(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return { loading, items, hasNextPage, error, loadMore };
}