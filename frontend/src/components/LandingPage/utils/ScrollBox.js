export default function InfiniteListWithVerticalScroll() {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <ListContainer
      // This where we set our scrollable root component.
      ref={rootRef}
    >
      <List>
        {items.map((item) => (
          <ListItem key={item.key}>{item.value}</ListItem>
        ))}
        {(loading || hasNextPage) && (
          <ListItem ref={sentryRef}>
            <Loading />
          </ListItem>
        )}
      </List>
    </ListContainer>
  );
}