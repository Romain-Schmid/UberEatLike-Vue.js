using System.Windows;


namespace Application_Lourde
{
    public partial class Vue_1 : Window
    {
        protected Model model { get; set; }
        protected Controller controller { get; set; }

        public Vue_1(Model currentmodel, Controller currentController)
        {
            model = currentmodel;
            controller = currentController;

            InitializeComponent();

            param_email.Content = model.user.email;
            param_password.Content = model.user.password;
            param_role.Content = model.user.role;
        }

        private void btn_logout_Click(object sender, RoutedEventArgs e)
        {
            controller.deconnection();

        }
    }
}