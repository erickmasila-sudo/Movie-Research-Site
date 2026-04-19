/**
 * @jest-environment jsdom
 */
const { loadMoviesByGenre } = require("./filter");

describe("loadMoviesByGenre", () => {
  it("adds a movie card", async () => {
    document.body.innerHTML = `
      <input id="search" value="batman" />
      <select id="genre"><option value="Action" selected>Action</option></select>
      <div id="Movie-holder"></div>
    `;

    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: async () => ({ Search: [{ imdbID: "1" }] }) })
      .mockResolvedValueOnce({ json: async () => ({ Genre: "Action", Poster: "", Title: "Batman", imdbRating: "8", Year: "2022" }) });

    await loadMoviesByGenre();

    expect(document.getElementById("Movie-holder").children.length).toBe(1);
  });
});