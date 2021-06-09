using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace HttpClientProjet
{
    public class User
    {
        public int id { get; set; }
        public string username { get; set; }
        public string role { get; set; }
        public string password { get; set; }
        public string email { get; set; }

    }

    class Program
    {
        static HttpClient client = new HttpClient();

        static void ShowUser(User user)
        {
            Console.WriteLine($"Id: {user.id}" + $"Username: {user.username}\tRole: " + $"{user.role}");
        }

        static async Task<Uri> CreateUserAsync(User user)
        {
            HttpResponseMessage response = await client.PostAsJsonAsync("api/create", user);
            response.EnsureSuccessStatusCode();

            // return URI of the created resource.
            return response.Headers.Location;
        }

        static async Task<User> GetUserAsync(string path)
        {
            User user = null;
            HttpResponseMessage response = await client.GetAsync(path);
            if (response.IsSuccessStatusCode){
                user = await response.Content.ReadAsAsync<User>();
            }
            return user;
        }

        static async Task<User> GetUserAsyncById(int id)
        {
            User user = null;
            try{
                HttpResponseMessage response = await client.GetAsync("api/getAll");
                if (response.IsSuccessStatusCode){
                    user = await response.Content.ReadAsAsync<User>();
                }
            }
            catch(Exception e){Console.WriteLine($"Error : {e}");}

            return user;
        }

        //static async Task<Product> UpdateProductAsync(Product product)
        //{
        //    HttpResponseMessage response = await client.PutAsJsonAsync(
        //        $"api/products/{product.Id}", product);
        //    response.EnsureSuccessStatusCode();

        //    // Deserialize the updated product from the response body.
        //    product = await response.Content.ReadAsAsync<Product>();
        //    return product;
        //}

        //static async Task<HttpStatusCode> DeleteProductAsync(string id)
        //{
        //    HttpResponseMessage response = await client.DeleteAsync(
        //        $"api/products/{id}");
        //    return response.StatusCode;
        //}

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

                User result = null;
                result = await GetUserAsyncById(1);
                //ShowUser(result);
                // Create a new product
                //User user = new User
                //{
                //    id = 9,
                //    username = "Charly",
                //    password = "cesi",
                //    role = "DeliveryMan",
                //    email = "charlytest@mail.com"

                //};

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