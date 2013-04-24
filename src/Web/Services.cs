using System;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using System.Runtime.Serialization;
using System.Collections.Generic;
using ServiceStack.Common.Web;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using ServiceStack.Text;

namespace MonoWeb {
	[Route("/auth/info")]
	public class AuthInfoRequest { }


	[Authenticate]
	public class AuthService : Service {
		public object Get(AuthInfoRequest request) {
			return this.GetSession();
		}
	}


	[Route("/test")]
	public class TestRequest { }


	[Route("/test/message")]
	[Route("/test/message/{Message}")]
	public class TestMessageRequest {
		public string Message { get; set; }
	}


	// Query string example.
	[Route("/testquery")]
	public class TestQueryRequest {
		public string Field1 { get; set; }		
		public string Field2 { get; set; }
		public string Field3 { get; set; }
	}


	[Route("/testlist")]
	public class TestListRequest : IReturn<string> { }


	public class TestResponse {
		public string Message { get; set; }
		public DateTime Timestamp { get; set; }

		public TestResponse() {
			Timestamp = DateTime.UtcNow;
		}
	}


	[Authenticate]
	public class AppService : Service {
		public TestResponse Get(TestRequest request) {
			return new TestResponse { Message = "No Passed Message" };
		}
		
		public TestResponse Get(TestMessageRequest request) {
			return new TestResponse { Message = request.Message };
		}

		public TestResponse Get(TestQueryRequest request) {
			return new TestResponse { Message = "Field1: " + request.Field1 + " - Field2: " + request.Field2 + " - Field3: " + request.Field3 };
		}

		public IList<string> Get(TestListRequest request) {
			return new List<string> { "Item1", "Item2", "Item3" };
		}

		public TestResponse Post(TestRequest request) {
			return new TestResponse { Message = "No Passed Message" };
		}

		public TestResponse Post(TestMessageRequest request) {
			return new TestResponse { Message = request.Message };
		}

		public TestResponse Put(TestRequest request) {
			return new TestResponse { Message = "No Passed Message" };
		}
		
		public TestResponse Put(TestMessageRequest request) {
			return new TestResponse { Message = request.Message };
		}

		public TestResponse Delete(TestRequest request) {
			return new TestResponse { Message = "No Passed Message" };
		}
		
		public TestResponse Delete(TestMessageRequest request) {
			return new TestResponse { Message = request.Message };
		}
	}
}
