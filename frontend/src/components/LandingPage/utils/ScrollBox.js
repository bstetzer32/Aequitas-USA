import useInfiniteScroll from 'react-infinite-scroll-hook';
import React, {useEffect, useMemo} from "react";
import Feed from './Feed'
import { useLoadItems } from './ScrollUtils';
import { useDispatch, useSelector} from "react-redux";
import * as feedActions from "../../../store/feed";

export default function InfiniteListWithVerticalScroll() {
  const context = useMemo(() => {
    return {}
  },[]);
  const sessionSubs = useSelector(state => state.session.subs);
  context.regions = sessionSubs?.regionSubs.map(region => region.id)
  context.offices = sessionSubs?.officeSubs.map(office => office.id)
  const { loading, hasNextPage, error, loadMore } = useLoadItems()
  const dispatch = useDispatch();
  const items = useSelector(state => state.feed);
  useEffect(() => {
    const fetchData = async () => await dispatch(feedActions.getItems(context, 20))
    fetchData()

  }, [context, dispatch])

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <Feed
      // This where we set our scrollable root component.
      
    ><div ref={rootRef}>
      <ul>
        {items.map((item) => (
          <li key={item.key}>{item.value}</li>
        ))}
        {(loading || hasNextPage) && (
          <li ref={sentryRef}>
            <h3>...Loading</h3>
          </li>
        )}
      </ul>
      </div>
    </Feed>
  );
}