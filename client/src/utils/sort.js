export const sortNumber = (list, sortColumn, setSortColumn) => {
  list.sort((a, b) => (sortColumn ? b.number - a.number : a.number - b.number));

  setSortColumn(!sortColumn);
};

export const sortDate = (list, sortColumn, setSortColumn) => {
  list.sort((a, b) =>
    sortColumn
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt)
  );

  setSortColumn(!sortColumn);
};

export const sortWord = (list, sortColumn, setSortColumn, e) => {
  let name = e.target.getAttribute('name');

  list.sort((a, b) => {
    const wordA = a[name].toLowerCase();
    const wordB = b[name].toLowerCase();
    if (sortColumn) return wordA < wordB ? -1 : wordA > wordB ? 1 : 0;
    else return wordB < wordA ? -1 : wordB > wordA ? 1 : 0;
  });

  setSortColumn(!sortColumn);
};
