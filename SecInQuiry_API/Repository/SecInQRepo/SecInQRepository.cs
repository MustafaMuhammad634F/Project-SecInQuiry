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

using Microsoft.Data.SqlClient;
using Microsoft.Data;
using Microsoft.EntityFrameworkCore;
using Portal_API.DatabasePrototype;
using Portal_API.DataPrototype;
using System.Runtime.CompilerServices;
using System.Data;

namespace Portal_API.Repository.SecInQRepo
{
    public class SecInQRepository : ISecInQRepository
    {
        private readonly MainDbContext _dbContext;
        
        public SecInQRepository(MainDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<SecInQ>> FetchFilteredData(SecInQ query)
        {

            var execQuery = $"EXEC RetrieveSecInQ_Vehicles @plateNum, @carOwner, @inquirer, @ip, " +
                    $"@TRF_Unit, @Date_from";

            var pltNum = new SqlParameter("@plateNum", query.PlateNum ?? (object)DBNull.Value);
            var crOwnr = new SqlParameter("@carOwner", query.OwnerName ?? (object)DBNull.Value);
            var inqrr = new SqlParameter("@inquirer", query.InquirerName ?? (object)DBNull.Value);
            var ipAdd = new SqlParameter("@ip", query.IP ?? (object)DBNull.Value);
            var trfUnt = new SqlParameter("@TRF_Unit", query.TrfUnit ?? (object)DBNull.Value);
            var dtFrm = new SqlParameter("@Date_from", query.Date_From ?? (object) DBNull.Value);
            //var dtTo = new SqlParameter("@Date_to", query.Date_To);

            List<SecInQ> response = await _dbContext!.RetrieveSecInQ_Data_FromDB!
                .FromSqlRaw(execQuery, pltNum, crOwnr, inqrr, ipAdd, trfUnt, dtFrm)!.ToListAsync();

            return response;

        }

        public async Task<IEnumerable<TrafficUnitCorrelation>> FetchTrafficUnits()
        {
            var retrieveQuery = "SELECT * FROM TrafficUnt_Governorate_Correlation";

            var sqlFormattedQuery = FormattableStringFactory.Create(retrieveQuery);

            List<TrafficUnitCorrelation> response = await _dbContext.RetrieveTrafficUnits_FromDB!
                                        .FromSql(sqlFormattedQuery).ToListAsync();

            if(response == null || !response.Any())
            {
                Console.WriteLine("No Results");
            }

            return response!;
        }

    }
}
