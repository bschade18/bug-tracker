export const sortNumber = (list, sortColumn, setSortColumn) => {
  list.sort((a, b) => (sortColumn ? b.number - a.number : a.number - b.number));

  setSortColumn(!sortColumn);
};

export const sortDate = (list, dateField, sortColumn, setSortColumn) => {
  list.sort((a, b) =>
    sortColumn
      ? new Date(b[dateField]) - new Date(a[dateField])
      : new Date(a[dateField]) - new Date(b[dateField])
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

export const sortProjects = (projects) =>
  projects.sort((a, b) => {
    const projA = a.toLowerCase();
    const projB = b.toLowerCase();
    return projA < projB ? -1 : projA > projB ? 1 : 0;
  });
