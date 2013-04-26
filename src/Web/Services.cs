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
	public class Test { }


	[Route("/test/message")]
	[Route("/test/message/{Message}")]
	public class TestMessage {
		public string Message { get; set; }
	}


	// Query string example.
	[Route("/testquery")]
	public class TestQuery {
		public string Field1 { get; set; }		
		public string Field2 { get; set; }
		public string Field3 { get; set; }
	}


	[Route("/testlist")]
	public class TestList { }


	public class TestResponse {
		public string Message { get; set; }
		public DateTime Timestamp { get; set; }

		public TestResponse() {
			Timestamp = DateTime.UtcNow;
		}
	}


	[Authenticate]
	public class AppService : Service {
		public TestResponse Get(Test request) {
			return new TestResponse { Message = "No Passed Message" };
		}
		
		public TestResponse Get(TestMessage request) {
			return new TestResponse { Message = request.Message };
		}

		public TestResponse Get(TestQuery request) {
			return new TestResponse { Message = "Field1: " + request.Field1 + " - Field2: " + request.Field2 + " - Field3: " + request.Field3 };
		}

		public IList<TestResponse> Get(TestList request) {
			return new List<TestResponse> { new TestResponse { Message = "Item1" }, new TestResponse { Message = "Item2" }, new TestResponse { Message = "Item3" } };
		}

		public TestResponse Post(Test request) {
			return new TestResponse { Message = "No Passed Message" };
		}

		public TestResponse Post(TestMessage request) {
			return new TestResponse { Message = request.Message };
		}

		public TestResponse Put(Test request) {
			return new TestResponse { Message = "No Passed Message" };
		}
		
		public TestResponse Put(TestMessage request) {
			return new TestResponse { Message = request.Message };
		}

		public TestResponse Delete(Test request) {
			return new TestResponse { Message = "No Passed Message" };
		}
		
		public TestResponse Delete(TestMessage request) {
			return new TestResponse { Message = request.Message };
		}
	}
}
