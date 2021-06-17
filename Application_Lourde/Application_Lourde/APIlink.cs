using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Net;
using System.Linq;

namespace Gestion_app
{
    public class User
    {
        public string id { get; set; }
        public string username { get; set; }
        public string role { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public string accessToken { get; set; }

    }

    public class APIcall
    {
        static HttpClient client = new HttpClient(new HttpClientHandler { UseCookies = false });
        static HttpClient clientlog = new HttpClient();

        public APIcall()
        {
            client.BaseAddress = new Uri("http://78.123.229.253:3456/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            clientlog.BaseAddress = new Uri("http://78.123.229.253:4567/");
            clientlog.DefaultRequestHeaders.Accept.Clear();
            clientlog.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        static void ShowMultipleUsers(List<User> users)
        {
            foreach (var user in users)
            {
                Console.WriteLine($"Id: {user.id} " + $"Username: {user.username}\tRole: " + $"{user.role}\tEmail: " + $"{user.email}");
            }
        }

        static void ShowUser(User user)
        {
            Console.WriteLine($"Id: {user.id} " + $"Username: {user.username}\tRole: " + $"{user.role}\tEmail: " + $"{user.email}");
        }

        static async Task<Uri> CreateUserAsync(User user)
        {
            HttpResponseMessage response = await client.PostAsJsonAsync("api/create", user);
            response.EnsureSuccessStatusCode();

            // return URI of the created resource.
            return response.Headers.Location;
        }

        //ne fonctionne pas car l'API renvoie plusieurs résultats
        static async Task<User> GetUserByIdAsync(string id)
        {
            User user = new User();
            HttpResponseMessage response = await client.GetAsync($"api/get/{id}");
            if (response.IsSuccessStatusCode)
            {
                user = await response.Content.ReadAsAsync<User>();
            }
            return user;
        }

        public async Task<List<User>> GetAllUserAsync()
        {
            var response = await client.GetAsync("users/getAll");
            List<User> result = new List<User>();

            if (response.IsSuccessStatusCode)
                result = await response.Content.ReadAsAsync<List<User>>();
            else { Console.WriteLine($"{0} ({1})", (int)response.StatusCode, response.ReasonPhrase); }

            return result;
        }

        static async Task<User> UpdateProductAsync(User user)
        {
            HttpResponseMessage response = await client.PutAsJsonAsync($"api/edit/{user.id}", user);
            response.EnsureSuccessStatusCode();

            // Deserialize the updated product from the response body.
            user = await response.Content.ReadAsAsync<User>();
            return user;
        }

        static async Task<HttpStatusCode> DeleteUserAsync(string id)
        {
            HttpResponseMessage response = await client.DeleteAsync($"api/delete/{id}");
            return response.StatusCode;
        }

        public async Task<int> Login(User user)
        {
            HttpResponseMessage response = await clientlog.PostAsJsonAsync($"/auth/login", user);
            int statutCode = (int)response.StatusCode;
            if (statutCode == 200)
                CheckToken(response);
            return statutCode;
        }

        static void CheckToken(HttpResponseMessage response)
        {
            if (response.Headers.SingleOrDefault(header => header.Key == "Set-Cookie").Value != null)
            {
                IEnumerable<string> cookies = response.Headers.SingleOrDefault(header => header.Key == "Set-Cookie").Value;
                client.DefaultRequestHeaders.Remove("Cookie");
                client.DefaultRequestHeaders.Add("Cookie", cookies);
            }
        }
    }
}