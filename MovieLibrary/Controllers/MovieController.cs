using MovieLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MovieLibrary.Controllers
{
    public class MovieController : ApiController
     
    {
        private ApplicationDbContext db;

        public MovieController()
        {
            db = new ApplicationDbContext(); 
        }
        // GET: api/Movie
        [HttpGet]
        public IEnumerable<Movie> Get()
        {
            IEnumerable<Movie> movies = db.Movies.ToArray();

            return movies;
        }

        // GET: api/Movie/5
        public Movie Get(int id)
        {
            Movie movie = db.Movies.Find(id);

            return movie;
        }

        // POST: api/Movie
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Movie/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Movie/5
        public void Delete(int id)
        {
        }
    }
}
