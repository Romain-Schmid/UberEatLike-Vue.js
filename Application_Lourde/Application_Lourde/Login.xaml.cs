using Gestion_app;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Application_Lourde
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class Login : Window
    {
        protected APIcall api { get; set; } = new APIcall();
        protected User user { get; set; } = new User();

        public Login()
        {
            InitializeComponent();
        }

        private void cb_role_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            user.role = ((ComboBoxItem)cb_role.SelectedItem).Content.ToString();
        }

        private void textbox_password_TextChanged(object sender, TextChangedEventArgs e)
        {
            user.password = textbox_password.Text;
        }

        private void textbox_email_TextChanged(object sender, TextChangedEventArgs e)
        {
            user.email = textbox_email.Text;
        }

        private void button_connexion_Click(object sender, RoutedEventArgs e)
        {
            int connectionCode = 0;
            //MessageBox.Show($"email : {user.email}" + $" password : {user.password}" + $" role : {user.role}");
            try
            {
                connectionCode = api.Login(user).GetAwaiter().GetResult();
            }
            catch(Exception ex)
            {
                MessageBox.Show(ex.Message);
            }

            if (connectionCode == 200)
            {
                Vue_1 vue1 = new Vue_1();
                vue1.Show();
                Close();

            }
            else
            {

            }
        }
    }
}
