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


using Portal_API.DataPrototype;


namespace Portal_API.Repository.SecInQRepo
{
    public interface ISecInQRepository
    {
        Task<IEnumerable<SecInQ>> FetchFilteredData(SecInQ query);

        Task<IEnumerable<TrafficUnitCorrelation>> FetchTrafficUnits();

    }

}
