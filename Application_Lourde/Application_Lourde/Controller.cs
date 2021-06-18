using System;
using System.Collections.Generic;
using System.Text;

namespace Application_Lourde
{
    public class Controller
    {
        Login login { set; get; }
        Vue_1 vue1 { set; get; }
        Model model { set; get; }
        public Controller(Model currentModel){
            model = currentModel;
        }

        public void initialisation()
        {
            login = new Login(model, this);
            login.Show();
        }

        public void deconnection()
        {
            model.user = new User();
            model.api = new API();

            login = new Login(model, this);

            login.Show();
            vue1.Close();
        }

        public void accesGranted()
        {
            vue1 = new Vue_1(model, this);
            vue1.Show();
            login.Close();

        }
    }
}
