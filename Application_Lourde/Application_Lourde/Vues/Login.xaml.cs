using System;
using System.Windows;
using System.Windows.Controls;


namespace Application_Lourde
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class Login : Window
    {
        protected Model model { get; set; }
        protected Controller controller { get; set; }

        public Login(Model currenTmodel, Controller currentController)
        {
            controller = currentController;
            model = currenTmodel;
            InitializeComponent();
        }

        private void cb_role_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            model.user.role = ((ComboBoxItem)cb_role.SelectedItem).Content.ToString();
        }

        private void textbox_password_TextChanged(object sender, TextChangedEventArgs e)
        {
            model.user.password = textbox_password.Text;
        }

        private void textbox_email_TextChanged(object sender, TextChangedEventArgs e)
        {
            model.user.email = textbox_email.Text;
        }

        private async void button_connexion_Click(object sender, RoutedEventArgs e)
        {
            int connectionCode = 0;
            try
            {
                connectionCode = await model.api.Login(model.user);
            }
            catch(Exception ex)
            {
                MessageBox.Show(ex.Message);
            }

            if (connectionCode == 200)
            {
                controller.accesGranted();
            }
            else
            {
                MessageBox.Show(connectionCode.ToString());
            }
        }
    }
}
