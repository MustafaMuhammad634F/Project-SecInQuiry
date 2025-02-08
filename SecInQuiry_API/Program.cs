/**
 *                           
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
                    ۞○               ○۞
                   ۞○      بسم الله     ○۞
                    ۞○     الرحمن   ○۞
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

//using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Portal_API.DatabasePrototype;
using Portal_API.Repository.IscoreRepo;
using Portal_API.Repository.SecInQRepo;

namespace Portal_API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<MainDbContext>(option =>
            {
                option.UseSqlServer(builder.Configuration.GetConnectionString("DBConnection"));
            });

            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();

            /*builder.Services.AddSpaStaticFiles(configs =>
            {
                configs.RootPath = "wwwroot\\portal-ui\\browser";
            });*/

            builder.Services.AddSwaggerGen();

            builder.Services.AddScoped<SecInQRepository>();
            builder.Services.AddScoped<IscoreRepository>();

            var app = builder.Build();


            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors(options =>
            {
                options.AllowAnyHeader();
                options.AllowAnyOrigin();
                options.AllowAnyMethod();
            });

            

            /*app.UseExceptionHandler("/Home/Error");
            app.UseHsts();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();*/

            app.UseRouting();

            /*app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "wwwroot\\portal-ui\\browser";
            });*/

            app.MapControllers();

            app.Run();
        }
    }
}
