

using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Portal_API.DatabasePrototype;
using Portal_API.DataPrototype;
using System.Net;

namespace Portal_API.Repository.IscoreRepo
{
    public class IscoreRepository
    {
        private readonly MainDbContext _dbContext;

        public IscoreRepository(MainDbContext dbContext) 
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Iscore>> FetchFilteredData(Iscore query)
        {
            var execQuery = $"EXEC IscrInQ_Vehicles @plateNum, @requestNum";

            var pltNum = new SqlParameter("plateNum", query.PlateNum ?? (object)DBNull.Value);
            var reqNum = new SqlParameter("requestNum", query.RequestNum);

            List<Iscore> response = await _dbContext!.RetireiveIscore_Data_FromDB
                    !.FromSqlRaw(execQuery, pltNum, reqNum).ToListAsync();

            return response;
        }
    }
}
