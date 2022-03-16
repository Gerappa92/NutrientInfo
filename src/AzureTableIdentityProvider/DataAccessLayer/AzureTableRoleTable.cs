using Azure;
using Azure.Data.Tables;
using Microsoft.AspNetCore.Identity;
using System.IO;
using System.Threading.Tasks;

namespace AzureTableIdentityProvider.DataAccessLayer
{
    public class AzureTableRoleTable
    {
        private const string _roleTableName = "ApplicationRole";
        private readonly TableClient _roleTableClient;

        public AzureTableRoleTable(string connectionString)
        {
            _roleTableClient = new TableClient(connectionString, _roleTableName);
            _roleTableClient.CreateIfNotExists();
        }

        public async Task<IdentityResult> CreateAsync(ApplicationRole role)
        {
            var response = await _roleTableClient.AddEntityAsync(role);

            if (response.IsError)
            {
                var error = GetError(response);
                return IdentityResult.Failed(error);
            }

            return IdentityResult.Success;
        }

        public async Task<IdentityResult> DeleteAsync(ApplicationRole role)
        {
            var response = await _roleTableClient.DeleteEntityAsync(role.PartitionKey, role.RowKey);

            if (response.IsError)
            {
                var error = GetError(response);
                return IdentityResult.Failed(error);
            }

            return IdentityResult.Success;
        }

        public async Task<ApplicationRole> FindByIdAsync(string roleId)
        {
            var pages = _roleTableClient.QueryAsync<ApplicationRole>(u => u.Id == roleId);
            ApplicationRole role = null;

            await foreach (var item in pages)
            {
                role = item;
                break;
            }

            return role;
        }

        public async Task<ApplicationRole> FindByNameAsync(string normalizedRoleName)
        {
            var pages = _roleTableClient.QueryAsync<ApplicationRole>(u => u.NormalizedName == normalizedRoleName);
            ApplicationRole role = null;

            await foreach (var item in pages)
            {
                role = item;
                break;
            }

            return role;
        }

        public async Task<IdentityResult> UpdateAsync(ApplicationRole role)
        {
            var response = await _roleTableClient.UpdateEntityAsync<ApplicationRole>(role, ETag.All);

            if (response.IsError)
            {
                var error = GetError(response);
                return IdentityResult.Failed(error);
            }

            return IdentityResult.Success;
        }

        private IdentityError GetError(Azure.Response response)
        {
            string description = string.Empty;

            if (response.ContentStream != null)
            {
                using TextReader content = new StreamReader(response.ContentStream);
                description = content.ReadToEnd();
            }

            return new IdentityError
            {
                Code = response.Status.ToString(),
                Description = description
            };
        }
    }
}
