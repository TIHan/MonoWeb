using System;
using System.Web.UI;
using System.Collections.Generic;
using ServiceStack.Common;
using ServiceStack.WebHost;
using ServiceStack.ServiceHost;
using ServiceStack.CacheAccess;
using ServiceStack.CacheAccess.Providers;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceInterface.Auth;
using ServiceStack.WebHost.Endpoints;

namespace MonoWeb {
	public class AppHost : AppHostBase {		
		public AppHost() : base("App", typeof(AppHost).Assembly) { }
		
		public override void Configure(Funq.Container container) {
			ServiceStack.Text.JsConfig.EmitCamelCaseNames = true;

			SetConfig(new EndpointHostConfig {
				ServiceStackHandlerFactoryPath = "api",
				EnableFeatures = Feature.All.Remove(Feature.Metadata)
			});
			
			//Enable Authentication
			ConfigureAuth(container);
		}

		// https://github.com/ServiceStack/ServiceStack/wiki/Authentication-and-authorization
		private void ConfigureAuth(Funq.Container container)
		{
			Plugins.Add(new AuthFeature(null, new IAuthProvider[] {
				new CredentialsAuthProvider()
			}));
			
			container.Register<ICacheClient>(new MemoryCacheClient());
			var userRep = new InMemoryAuthRepository();
			container.Register<IUserAuthRepository>(userRep);

#if DEBUG
			CreateUser(userRep, 1, "admin", "admin@admin.com", "password", null, null);
#endif
			
			//The IUserAuthRepository is used to store the user credentials etc.
			//Implement this interface to adjust it to your application's data storage.	
		}

		private void CreateUser(IUserAuthRepository userRep, int id, string userName, string email, string password, List<string> roles = null, List<string> permissions = null) {
			string hash;
			string salt;
			new SaltedHash().GetHashAndSaltString(password, out hash, out salt);

			userRep.CreateUserAuth(new UserAuth {
			Id = id,
			DisplayName = "DisplayName",
			Email = email,
			UserName = userName,
			FirstName = "FirstName",
			LastName = "LastName",
			PasswordHash = hash,
			Salt = salt,
			Roles = roles,
			Permissions = permissions
			}, password);
		}
	}
}

