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
        public IHttpActionResult Post([FromBody]Movie newMovie)
        {
            if(newMovie == null)
            {
                return StatusCode(HttpStatusCode.BadRequest);
            }

            db.Movies.Add(newMovie);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // PUT: api/Movie/5
        public IHttpActionResult Put([FromUri]int id, [FromBody]Movie movie)
        {
            try
            {
                Movie foundMovie = db.Movies.Find(id);

                foundMovie.Title = movie.Title;
                foundMovie.Genre = movie.Genre;
                foundMovie.DirectorName = movie.DirectorName;

                db.SaveChanges();

                return StatusCode(HttpStatusCode.NoContent);
            }
            catch
            {
                return StatusCode(HttpStatusCode.BadRequest);
            }
        }

        // DELETE: api/Movie/5
        //public void Delete(int id)
        //{
        //    Movie foundMovie = db.Movies.Find(id);
        //    db.Movies.Remove(foundMovie);

        //    db.SaveChanges();
        //}
    }
}

