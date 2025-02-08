

using Portal_API.DataPrototype;

namespace Portal_API.Repository.IscoreRepo
{
    public interface IIScoreRepository
    {
        Task<IEnumerable<Iscore>> FetchFilterdData(Iscore query);
    }
}
