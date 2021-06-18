using System;
using System.Collections.Generic;
using System.Text;

namespace Application_Lourde
{
    public class Model
    {
        public User user { get; set; }
        public API api { get; set; }

        public Model()
        {
            user = new User();
            api = new API();
        }
    }
}
