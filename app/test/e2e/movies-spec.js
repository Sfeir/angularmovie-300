describe('Movies page', function() {

   beforeEach(function(){
      browser.get('http://localhost:9000/#/movies');
   });

  it('Length of movies', function() {
    var divs = element.all(by.repeater('movie in filteredMovies'));
    expect(divs.count()).toEqual(9);
    expect(divs.get(0).$('.caption h3 span').getText()).toEqual('AVATAR');
  });

  it('Search input', function() {
     var input = element(by.model('search')), divs;
     input.sendKeys('sei');
     divs = element.all(by.repeater('movie in filteredMovies'));
     expect(divs.count()).toEqual(3);
  });

  it('Sort movies by date', function() {
     var input = element(by.buttonText('Trier par année')), divs;
     input.click();
     divs = element.all(by.repeater('movie in filteredMovies'));
     expect(divs.get(0).$('.caption h3 span').getText()).toEqual('YIP MAN 2');
  });

});
