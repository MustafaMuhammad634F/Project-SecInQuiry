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
using Portal_API.DataPrototype;
using Portal_API.Repository.SecInQRepo;

namespace Portal_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SecInQController : ControllerBase
    {

        private SecInQRepository secInQRepository_;

        public SecInQController(SecInQRepository secInQRepository)
        {
            secInQRepository_ = secInQRepository;
        }

        [HttpPost]
        [Route("/secInQFilteredData")]
        public async Task<IActionResult> FetchFilteredData([FromBody] SecInQ secInQ)
        {
            SecInQ secQuery = new SecInQ
            {
                PlateNum = secInQ.PlateNum,
                OwnerName = secInQ.OwnerName,
                IP = secInQ.IP,
                InquirerName = secInQ.InquirerName,
                TrfUnit = secInQ.TrfUnit,
                Date_From = secInQ.Date_From
            };

            var fetchedData = await secInQRepository_.FetchFilteredData(secQuery);

            if(fetchedData == null || !fetchedData.Any())
            {
                Console.WriteLine("No Results found");
            }

            return Ok(fetchedData);
        }

        [HttpGet]
        [Route("/extractTrafUnts")]
        public async Task<IActionResult> ExtractTrafficUnits()
        {
            var fetchedData = await secInQRepository_.FetchTrafficUnits();

            return Ok(fetchedData);
        }

    }
}
