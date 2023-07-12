ssh-to-ec2:
	#  chmod 400 jperez.pem
	 ssh -i "jperez.pem" ubuntu@ec2-15-237-119-156.eu-west-3.compute.amazonaws.com


conect-from-ec2:
	mongosh --host jperez.cluster-ro-c6pvacxrprws.eu-west-3.docdb.amazonaws.com:27017  --username jperez --password 9876ASadsasASDASDghfASD --retryWrites false
	#mongosh --host jperez.cluster-c6pvacxrprws.eu-west-3.docdb.amazonaws.com:27017  --username jperez --password 9876ASadsasASDASDghfASD
	#--ssl --sslCAFile global-bundle.pem

forward-port-to-cluster:
	#ssh -i "jperez.pem" -L 27018:jperez.c6pvacxrprws.eu-west-3.docdb.amazonaws.com:27017 ubuntu@ec2-15-237-119-156.eu-west-3.compute.amazonaws.com -N
	ssh -i "jperez.pem" -L 27017:jperez.cluster-c6pvacxrprws.eu-west-3.docdb.amazonaws.com:27017 ubuntu@ec2-15-237-119-156.eu-west-3.compute.amazonaws.com -N


forward-port-to-replica:
	ssh -i "jperez.pem" -L 27018:jperez.cluster-ro-c6pvacxrprws.eu-west-3.docdb.amazonaws.com:27017 ubuntu@ec2-15-237-119-156.eu-west-3.compute.amazonaws.com -N


conect-from-localhost:
	mongosh --ssl --sslAllowInvalidHostnames  --host localhost:27017 --sslCAFile global-bundle.pem --username jperez --password 9876ASadsasASDASDghfASD --retryWrites false


test:
	deno test --allow-all