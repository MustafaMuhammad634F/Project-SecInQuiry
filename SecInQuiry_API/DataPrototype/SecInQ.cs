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
    public class SecInQ
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Int64 id { get; }
        public string? PlateNum { get; set; }
        public string? OwnerName { get; set; }
        public string? IP { get; set; }
        public string? InquirerName { get; set; }
        public string? TrfUnit { get; set; }

        public DateTime? Date_From { get; set; }

        [NotMapped]
        public DateTime? Date_To { get; set; }

    }
}
