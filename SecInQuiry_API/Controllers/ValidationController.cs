/*
                              ••
                            //\\
                           //  \\
                        ..//    \\..
                          \\    //
                           \\__//
                           //  \\
                          //    \\
                         //      \\
                        //        \\
                       //          \\
                      //            \\
                     //              \\
                    ○۞               ○۞
                   ○۞      بسم الله     ○۞
                    ○۞     الرحمن   ○۞
                    \\     الرحيم   //
                     \\              //
                      \\            //
                       \\          //
                        \\        //
                         \\      //
                          \\    //
                           \\__//
                           //  \\
                        --//    \\--
                          \\    //
                           \\  //
                            \\//
                             ••
 */

using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Portal_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValidationController : ControllerBase
    {
        private IConfiguration _configuration;

        public ValidationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("/validateConnection")]
        public ActionResult<bool> ValidateConnection()
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("DBConnection")))
                {
                    conn.Open();

                    if (conn.State == System.Data.ConnectionState.Open)
                    {
                        return Ok(true);
                    }
                    else
                    {
                        return Ok(false);
                    }
                }
            }
            catch(Exception)
            {
                return Ok(false);
            }
        }

        [HttpGet]
        [Route("/validateData")]
        public ActionResult<Dictionary<string, string>> ExtractData()
        {
            Dictionary<string, string> dataDict = new Dictionary<string, string>();
            dataDict.Add("أســــــوان", "['وحدة مرور أسوان','وحدة مرور إدفو','وحدة مرور كوم امبو','إدارة مرور أسوان','وحدة مرور نصر النوبة','وحدة مرور دراو','المعاملات المركزية اسوان','منفذ ميناء ارقين البرى','منفذ ميناء قسطل البرى','مركز فحص فنى الكترونى 7','وحدة مرور الخدمات الالكترونية 22','مركز خدمات مصر أسوان','خدمات الكترونية متنقلة 6']");

            return Ok(dataDict);
        }
    }
}
