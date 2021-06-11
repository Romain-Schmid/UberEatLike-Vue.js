using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Net;

namespace HttpClientProjet
{
    public class User
    {
        public string id { get; set; }
        public string username { get; set; }
        public string role { get; set; }
        public string password { get; set; }
        public string email { get; set; }

    }

    class Program
    {
        static HttpClient client = new HttpClient();

        static void ShowMultipleUsers(List<User> users){
            foreach(var user in users){
               Console.WriteLine($"Id: {user.id} " + $"Username: {user.username}\tRole: " + $"{user.role}\tEmail: " + $"{user.email}");
            }
        }

        static void ShowUser(User user){
                Console.WriteLine($"Id: {user.id} " + $"Username: {user.username}\tRole: " + $"{user.role}\tEmail: " + $"{user.email}");
        }

        static async Task<Uri> CreateUserAsync(User user)
        {
            HttpResponseMessage response = await client.PostAsJsonAsync("api/create", user);
            response.EnsureSuccessStatusCode();

            // return URI of the created resource.
            return response.Headers.Location;
        }

        static async Task<User> GetUserByIdAsync(string id)
        {
            List<User> user = new List<User>();
            HttpResponseMessage response = await client.GetAsync($"api/get/{id}");
            if (response.IsSuccessStatusCode){
                user = await response.Content.ReadAsAsync<List<User>>();
                //foreach(var t in user)
                //{
                //    Console.WriteLine($"Id : {t.id}\tSurnom :" + $"{t.username}");
                //}
            }
         
            return user[0];
        }

        static async Task<List<User>> GetAllUserAsync(){
            var response = await client.GetAsync("api/getAll");
            List<User> result = new List<User>();

            if (response.IsSuccessStatusCode)
                result = await response.Content.ReadAsAsync<List<User>>();
            else{Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);}

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

        static void Main()
        {
            RunAsync().GetAwaiter().GetResult();
        }

        static async Task RunAsync()
        {
            // Update port # in the following line.
            client.BaseAddress = new Uri("http://78.123.229.253:3456/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            try{

                ShowUser(await GetUserByIdAsync("19"));



                //var url = await CreateUserAsync(user);
                //Console.WriteLine($"Created at {url}");

                // Get the product
                //user = await GetUserAsync(url.PathAndQuery);
                //ShowUser(user);

                //// Update the product
                //Console.WriteLine("Updating price...");
                //product.Price = 80;
                //await UpdateProductAsync(product);

                //// Get the updated product
                //product = await GetProductAsync(url.PathAndQuery);
                //ShowProduct(product);

                //// Delete the product
                //var statusCode = await DeleteProductAsync(product.Id);
                //Console.WriteLine($"Deleted (HTTP Status = {(int)statusCode})");

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            Console.ReadLine();
        }
    }
}