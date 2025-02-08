
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;
using System.Xml.Serialization;

namespace Portal_API.DataPrototype
{
    public class Iscore
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Int64 id { get; }
        public string? PlateNum { get; set; }
        public string? PersonOwner { get; set; }
        public string? EntityOwner { get; set; }
        public string? FinancialBranch { get; set; }
        public string? RequestNum { get; set; }
        public bool? IdenticalTest { get; set; }
    }
}
