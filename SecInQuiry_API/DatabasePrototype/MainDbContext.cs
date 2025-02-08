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

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Portal_API.DataPrototype;
using System.Collections.ObjectModel;
using System.Diagnostics.Metrics;

namespace Portal_API.DatabasePrototype
{
    public class MainDbContext: DbContext
    {

        private IConfiguration configuration_ { get; }

        public MainDbContext(DbContextOptions<MainDbContext>? options, IConfiguration configuration)
        {
            configuration_ = configuration;
        }

        public DbSet<SecInQ>? RetrieveSecInQ_Data_FromDB { get; set; }
        public DbSet<Iscore>? RetireiveIscore_Data_FromDB { get; set; }
        public DbSet<TrafficUnitCorrelation>? RetrieveTrafficUnits_FromDB { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<SecInQ>()
                .HasKey(obj => obj.id);

            modelBuilder.Entity<SecInQ>()
                .Ignore(obj => obj.Date_To);

            modelBuilder.Entity<Iscore>()
                .HasKey(obj => obj.id);

            modelBuilder.Entity<TrafficUnitCorrelation>()
                    .HasNoKey();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder dbOptions)
        {
            base.OnConfiguring(dbOptions);

            dbOptions.UseSqlServer(configuration_.GetConnectionString("DBConnection"), sqlServerOptions =>
            {
                sqlServerOptions.CommandTimeout(400);
            });
        }
    }
}
