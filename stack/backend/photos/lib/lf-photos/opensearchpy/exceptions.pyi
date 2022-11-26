# SPDX-License-Identifier: Apache-2.0
#
# The OpenSearch Contributors require contributions made to
# this file be licensed under the Apache-2.0 license or a
# compatible open source license.
#
# Modifications Copyright OpenSearch Contributors. See
# GitHub history for details.
#
#  Licensed to Elasticsearch B.V. under one or more contributor
#  license agreements. See the NOTICE file distributed with
#  this work for additional information regarding copyright
#  ownership. Elasticsearch B.V. licenses this file to you under
#  the Apache License, Version 2.0 (the "License"); you may
#  not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
# 	http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing,
#  software distributed under the License is distributed on an
#  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#  KIND, either express or implied.  See the License for the
#  specific language governing permissions and limitations
#  under the License.

from typing import Any, Dict, Union

class ImproperlyConfigured(Exception): ...
class OpenSearchException(Exception): ...
class SerializationError(OpenSearchException): ...

class TransportError(OpenSearchException):
    @property
    def status_code(self) -> Union[str, int]: ...
    @property
    def error(self) -> str: ...
    @property
    def info(self) -> Union[Dict[str, Any], Exception, Any]: ...
    def __str__(self) -> str: ...

class ConnectionError(TransportError):
    def __str__(self) -> str: ...

class SSLError(ConnectionError): ...

class ConnectionTimeout(ConnectionError):
    def __str__(self) -> str: ...

class NotFoundError(TransportError): ...
class ConflictError(TransportError): ...
class RequestError(TransportError): ...
class AuthenticationException(TransportError): ...
class AuthorizationException(TransportError): ...
class OpenSearchWarning(Warning): ...

OpenSearchDeprecationWarning = OpenSearchWarning

HTTP_EXCEPTIONS: Dict[int, OpenSearchException]
