function isItemInList(data, id) {
  return data?.map((list) => list.id).includes(id);
}

export default isItemInList;
