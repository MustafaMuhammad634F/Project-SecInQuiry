

using Microsoft.AspNetCore.Mvc;
using Portal_API.DataPrototype;
using Portal_API.Repository.IscoreRepo;

namespace Portal_API.Controllers
{
    public class IscoreController : ControllerBase
    {
        private IscoreRepository _iscoreRepository;

        public IscoreController(IscoreRepository iscoreRepositor)
        {
            _iscoreRepository = iscoreRepositor;
        }

        [HttpPost]
        [Route("/iscoreFilteredData/")]
        public async Task<IActionResult> FetchFilteredData([FromBody] Iscore iscore)
        {
            Iscore iscoreQuery = new Iscore
            {
                PlateNum = iscore.PlateNum,
                RequestNum = iscore.RequestNum
            };

            var fetchedData = await _iscoreRepository.FetchFilteredData(iscoreQuery);

            return Ok(fetchedData);
        }
    }
}
