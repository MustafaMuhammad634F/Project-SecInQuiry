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


using System.ComponentModel.DataAnnotations.Schema;

namespace Portal_API.DataPrototype
{
    public class TrafficUnitCorrelation
    {
        public string? Governorate { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? TrafficUnits { get; set; }

    }
}
