using System;
using System.Runtime.Serialization;
using System.Collections.Generic;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;

namespace MonoWeb {
	[Route("/test")]
	public class TestRequest {
	}


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
	}


	public class TestResponse {
		public string Message { get; set; }
		public DateTime Timestamp { get; set; }

		public TestResponse() {
			Timestamp = DateTime.UtcNow;
		}
	}


	public class AppService : Service {
		public TestResponse Get(TestRequest request) {
			return new TestResponse { Message = "No Passed Message" };
		}
		
		public TestResponse Get(TestMessageRequest request) {
			return new TestResponse { Message = request.Message };
		}

		public TestResponse Get(TestQueryRequest request) {
			return new TestResponse { Message = "Field1: " + request.Field1 + " - Field2: " + request.Field2 };
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
